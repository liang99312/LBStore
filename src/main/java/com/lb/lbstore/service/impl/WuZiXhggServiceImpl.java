/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.WuZiXhggDao;
import com.lb.lbstore.domain.WuZiXhgg;
import com.lb.lbstore.service.WuZiXhggService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("wuZiXhggServiceImpl")
public class WuZiXhggServiceImpl implements WuZiXhggService {

    @Autowired
    private WuZiXhggDao wuZiXhggDao;

    @Override
    public WuZiXhgg getWuZiXhggById(Integer id) {
        return (WuZiXhgg) wuZiXhggDao.findObjectById(WuZiXhgg.class, id);
    }

    @Override
    public List<WuZiXhgg> getWuZiXhgg4zd(Integer wzzd_id) {
        List parameters = new ArrayList();
        parameters.add(wzzd_id);
        return wuZiXhggDao.getResult("from WuZiXhgg wuZiXhgg where wzzd_id=?", parameters.toArray());
    }

    @Override
    public boolean updateWuZiXhgg(WuZiXhgg wuZiXhgg) {
        return wuZiXhggDao.update(wuZiXhgg);
    }

    @Override
    public WuZiXhgg saveWuZiXhgg(WuZiXhgg wuZiXhgg) {
        int id = wuZiXhggDao.save(wuZiXhgg);
        return (WuZiXhgg) wuZiXhggDao.findObjectById(WuZiXhgg.class, id);
    }

    @Override
    public boolean deleteWuZiXhgg(Integer id) {
        return wuZiXhggDao.deleteObjById("wuZiXhgg", id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        parameters.add(map.get("wzzd_id"));
        String sql = "select count(1) from WuZiXhgg where qy_id=? and wzzd_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return wuZiXhggDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<WuZiXhgg> queryWuZiXhggsByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        parameters.add(map.get("wzzd_id"));
        String hql = "from WuZiXhgg where qy_id=? and wzzd_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return wuZiXhggDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

}
