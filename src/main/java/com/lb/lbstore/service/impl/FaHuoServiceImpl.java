/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.FaHuoDao;
import com.lb.lbstore.domain.FaHuo;
import com.lb.lbstore.domain.FaHuoFei;
import com.lb.lbstore.service.FaHuoService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("faHuoServiceImpl")
public class FaHuoServiceImpl implements FaHuoService {

    @Autowired
    private FaHuoDao faHuoDao;

    @Override
    public FaHuo getFaHuoById(Integer id) {
        return (FaHuo) faHuoDao.findObjectById(FaHuo.class, id);
    }
    
    @Override
    public FaHuo getFaHuoDetailById(Integer id) {
        return  faHuoDao.getFaHuoDetailById(id);
    }

    @Override
    public boolean updateFaHuo(FaHuo faHuo) {
        return faHuoDao.updateFaHuo(faHuo);
    }

    @Override
    public FaHuo saveFaHuo(FaHuo faHuo) {
        int id = faHuoDao.saveFaHuo(faHuo);
        return (FaHuo) faHuoDao.findObjectById(FaHuo.class, id);
    }

    @Override
    public boolean deleteFaHuo(Integer id) {
        return faHuoDao.deleteFaHuo(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from FaHuo where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return faHuoDao.getCount(sql, null);
    }

    @Override
    public List<FaHuo> queryFaHuosByPage(HashMap map) {
        return faHuoDao.queryFaHuosByPage(map);
    }
    
    @Override
    public int queryFeiRows(HashMap map) {
        String sql = "select (1) from FaHuoFei where fh_id="+map.get("fh_id");
        return faHuoDao.getCount(sql, null);
    }

    @Override
    public List<FaHuoFei> queryFaHuoFeisByPage(HashMap map) {
        return faHuoDao.queryFaHuoFeisByPage(map);
    }

    @Override
    public boolean dealFaHuo(FaHuo faHuo,Integer a01_id) {
        return faHuoDao.dealFaHuo(faHuo, a01_id);
    }

    @Override
    public FaHuoFei getFaHuoFeiById(Integer id) {
        return (FaHuoFei) faHuoDao.findObjectById(FaHuoFei.class, id);
    }

    @Override
    public boolean updateFaHuoFei(FaHuoFei faHuoFei) {
        return faHuoDao.updateFaHuoFei(faHuoFei);
    }

    @Override
    public FaHuoFei saveFaHuoFei(FaHuoFei faHuoFei) {
        int id = faHuoDao.saveFaHuoFei(faHuoFei);
        return (FaHuoFei) faHuoDao.findObjectById(FaHuoFei.class, id);
    }

    @Override
    public boolean deleteFaHuoFei(Integer id,Integer fh_id) {
        return faHuoDao.deleteFaHuoFei(id, fh_id);
    }

}
