/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.FaHuo;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface FaHuoService {

    public FaHuo getFaHuoById(Integer id);
    
    public FaHuo getFaHuoDetailById(Integer id);
       
    public boolean updateFaHuo(FaHuo faHuo);
    
    public boolean dealFaHuo(FaHuo faHuo,Integer a01_id);
    
    public FaHuo saveFaHuo(FaHuo faHuo);
    
    public boolean deleteFaHuo(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<FaHuo> queryFaHuosByPage(HashMap map);

}
