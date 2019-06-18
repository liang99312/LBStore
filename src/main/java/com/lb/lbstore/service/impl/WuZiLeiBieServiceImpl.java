/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.WuZiLeiBieDao;
import com.lb.lbstore.domain.WuZiLeiBie;
import com.lb.lbstore.service.WuZiLeiBieService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("wuZiLeiBieServiceImpl")
public class WuZiLeiBieServiceImpl implements WuZiLeiBieService {

    @Autowired
    private WuZiLeiBieDao wuZiLeiBieDao;

    @Override
    public WuZiLeiBie getWuZiLeiBieById(Integer id) {
        return (WuZiLeiBie) wuZiLeiBieDao.findObjectById(WuZiLeiBie.class, id);
    }

    @Override
    public List<WuZiLeiBie> getAllWuZiLeiBies(Integer qy_id) {
        return wuZiLeiBieDao.getResult("from WuZiLeiBie wuZiLeiBie where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateWuZiLeiBie(WuZiLeiBie wuZiLeiBie) {
        return wuZiLeiBieDao.update(wuZiLeiBie);
    }

    @Override
    public WuZiLeiBie saveWuZiLeiBie(WuZiLeiBie wuZiLeiBie) {
        int id = wuZiLeiBieDao.save(wuZiLeiBie);
        return (WuZiLeiBie) wuZiLeiBieDao.findObjectById(WuZiLeiBie.class, id);
    }

    @Override
    public boolean deleteWuZiLeiBie(Integer id) {
        WuZiLeiBie wuZiLeiBie = (WuZiLeiBie) wuZiLeiBieDao.findObjectById(WuZiLeiBie.class, id);
        if(wuZiLeiBie.getState() == 0){
            wuZiLeiBie.setState(-1);
            return wuZiLeiBieDao.update(wuZiLeiBie);
        }else if(wuZiLeiBie.getState() == -1){
            return wuZiLeiBieDao.deleteObjById("wuZiLeiBie", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select count(1) from WuZiLeiBie where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return wuZiLeiBieDao.getCount(sql, null);
    }

    @Override
    public List<WuZiLeiBie> queryWuZiLeiBiesByPage(HashMap map) {
        String hql = "from WuZiLeiBie where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return wuZiLeiBieDao.getPageList(hql, null, Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existWuZiLeiBie(Integer qy_id, Integer id, String mc) {
        return wuZiLeiBieDao.existWuZiLeiBie(qy_id, id, mc);
    }

}
